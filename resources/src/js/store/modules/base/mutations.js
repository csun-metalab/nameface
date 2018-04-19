export default {
    GET_DATA (state) {
        axios.get(`data`)
            .then(response => {
                state.courses = response.data["courses"];
                state.roster = response.data["students"];
                state.flashroster = response.data["students"].slice();
                state.faculty_email = response.data["courses"][0].instructors[0].instructor;
                state.faculty_name = state.faculty_email.replace("nr_", "");
                state.faculty_name = state.faculty_name.split('@')[0];
                state.faculty_profile = "http://www.csun.edu/faculty/profiles/" + state.faculty_name;
                state.faculty_first_name = state.faculty_name.charAt(0).toUpperCase() + state.faculty_name.substring(1, state.faculty_name.indexOf('.'));
                state.faculty_last_name = state.faculty_name.substring((state.faculty_name.indexOf('.') + 2), state.faculty_name.length);
                state.faculty_last_name = state.faculty_name.charAt((state.faculty_name.indexOf('.') + 1)).toUpperCase() + state.faculty_last_name;
                state.faculty_full_name = state.faculty_first_name + " " + state.faculty_last_name ;
            })
            .catch(e => {
                console.log(e);
            })
    },

    TOGGLE_LIST (state) {
        state.list = !state.list;
    },

    TOGGLE_FLASH (state) {
        state.flash = !state.flash;
    },

    TOGGLE_MENU (state) {
        state.menushow = !state.menushow;
    },

    SHUFFLE_FLASH (state, { courseid }) {
        let unKnownStudents = [];
        let knownStudents = [];

        state.flashroster[courseid].forEach((student) => {
            if(student.recognized === true) {
                knownStudents.push(student)
            } else {
                unKnownStudents.push(student)
            }
        });

        let currentIndex = unKnownStudents.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = unKnownStudents[currentIndex];
            unKnownStudents[currentIndex] = unKnownStudents[randomIndex];
            unKnownStudents[randomIndex] = temporaryValue;
        }

        let currentIndexTwo = knownStudents.length, temporaryValueTwo, randomIndexTwo;

        // While there remain elements to shuffle...
        while (0 !== currentIndexTwo) {

            // Pick a remaining element...
            randomIndexTwo = Math.floor(Math.random() * currentIndexTwo);
            currentIndexTwo -= 1;

            // And swap it with the current element.
            temporaryValueTwo = knownStudents[currentIndexTwo];
            knownStudents[currentIndexTwo] = knownStudents[randomIndexTwo];
            knownStudents[randomIndexTwo] = temporaryValueTwo;
        }

        state.flashroster[courseid] = unKnownStudents.concat(knownStudents);

        state.flash = false;
        state.flash = true;
    },

    SORT_ROSTER: function (state) {
        state.roster.forEach((course) => {
            function sortedRoster (self) {
                if (state.lastname === true) {
                    if(state.descending === true) {
                        return self.sort((a, b) => {
                            return a.last_name.localeCompare(b.last_name);
                        });
                    } else {
                        return self.sort((a, b) => {
                            return a.last_name.localeCompare(b.last_name);
                        }).reverse();
                    }
                } else {
                    if(state.descending === true) {
                        return self.sort((a, b) => {
                            return a.first_name.localeCompare(b.first_name);
                        });
                    } else {
                        return self.sort((a, b) => {
                            return a.first_name.localeCompare(b.first_name);
                        }).reverse();
                    }
                }
            }

            course = sortedRoster(course);
        });
    },

    SORT_FIRST_NAME: function (state) {
        state.lastname = false;
    },

    SORT_LAST_NAME: function (state) {
        state.lastname = true;
    },

    SORT_DESC: function (state) {
        state.descending = true;
    },

    SORT_ASC: function (state) {
        state.descending = false;
    },

    GET_COURSE_ID: function (state, payload) {
        state.courseid = payload.courseid;
        state.courseTitle = state.courses[state.courseid].title;
    },

    GET_FACULTY_PROFILE: function (state, payload) {
        axios.get(`faculty_profile/${state.faculty_email}`)
            .then(response => {
                state.faculty_profile_image = response.data;
            })
            .catch(e => {
                console.log(e);
            });
    },

    GET_STUDENT_PROFILE: function (state, payload) {
        state.sp_emailURI = payload.uri;
        axios.get('student/'+state.sp_emailURI+'@my.csun.edu')
            .then(response => {
                state.sp_bio = response['data']['people'].biography;

                if(state.sp_bio === null)
                    state.sp_bio = "Pending biography from student.";
            })
            .catch(e => {
                console.log(e);
            });

        axios.get('student_profile/'+state.sp_emailURI+'@my.csun.edu')
            .then(response => {
                state.sp_display_name = response['data'].display_name;
                state.sp_images = response['data'].images;
                state.sp_image_priority = response['data'].image_priority;
                state.sp_notes = response['data'].notes;
                state.sp_student_id = response['data'].student_id;
            })
            .catch(e => {
                console.log(e);
            });
    },

    UPDATE_NOTES: function (state, notes) {
        state.sp_notes = notes;
    },

    COMMIT_NOTES: function (state) {
        let data = new FormData;
        data.append('student_id', state.sp_student_id);
        data.append('notepad', state.sp_notes);

        axios.post('update_note', data)
            .catch(e => {
                console.log(e)
            });
    },

    UPDATE_IMAGE_PRIORITY: function (state, payload) {
        let data = new FormData;
        data.append('student_id', state.sp_student_id.replace("members:", ""));
        data.append('image_priority', payload.image_priority);

        axios.post('api/priority', data)
            .then(response => {
                state.sp_image_priority = payload.image_priority;
            })
            .catch(e => {
                console.log(e)
            });
    }
}