export default {
  API_FAILURE(state, payload) {
    state.profileErrors = payload.response.data.message;
  },

  API_STUDENT_FAILURE(state, payload) {
    state.profileLoadError = true;
    state.profileErrors = payload.response.data.message;
  },

  GET_STUDENT_PROFILE(state, { payload, getters, response }) {
    const email = payload.data.email;
    state.studentProfile.emailURI = response.uri;
    state.studentProfile.displayName = payload.data.display_name;
    state.studentProfile.imagePriority = payload.data.image_priority;
    state.studentProfile.notes = payload.data.notes;
    state.studentProfile.id = payload.data.student_id;
    state.studentProfile.firstName = payload.data.first_name;
    for (const student in getters.students) {
      if (getters.students.hasOwnProperty(student)) {
        if (getters.students[student].email == email) {
          state.studentProfile.student = getters.students[student];
          state.studentProfile.images = getters.students[student].images;
          break;
        }
      }
    }
  },

  GET_STUDENT_PROFILE_NO_EMAIL(state, { payload, getters, response }) {
    const email = response.email;
    state.studentProfile.emailURI = response.uri;
    state.studentProfile.displayName = payload.data.display_name;
    state.studentProfile.imagePriority = payload.data.image_priority;
    state.studentProfile.notes = payload.data.notes;
    state.studentProfile.id = payload.data.student_id;
    state.studentProfile.firstName = payload.data.first_name;
    for (const student in getters.students) {
      if (getters.students[student].email == email) {
        state.studentProfile.student = getters.students[student];
        state.studentProfile.images = getters.students[student].images;
        break;
      }
    }
  },

  GET_STUDENT_BIO(state, payload) {
    state.studentProfile.bio = payload.data.bio;
  },

  UPDATE_NOTES(state, notes) {
    state.studentProfile.notes = notes;
  },

  UPDATE_IMAGE_PRIORITY(state, payload, rootState) {
    const data = new FormData();
    data.append('student_id', state.studentProfile.id);
    data.append('image_priority', payload.image_priority);
    data.append('faculty_id', payload.faculty_id);
  },

  NULLIFY_STUDENT_PROFILE(state) {
    state.studentProfile = {
      id: null,
      emailURI: null,
      displayName: null,
      bio: null,
      images: null,
      imagePriority: null,
      notes: null,
      firstName: null,
    };

    state.profileErrors = null;
  },

  CLEAR_PROFILE_ERRORS(state) {
    state.profileErrors = null;
    state.profileLoadError = false;
  },

    //Modal Specific
    TOGGLE_MODAL: function(state, payload){
        state.modalVisible = payload;
    },

    DATA_FOR_MODAL: function(state, payload){
        state.modalData = payload;
    },

    //toggle cropping functionality
    TOGGLE_CROPPING (state, payload) {
        state.toggleCroppa = payload;
    }, 

    //store student
    STORE_STUDENT(state, payload) {
      state.currentStudent = payload;
    },

    GET_STUDENT(state, payload) {
      state.studentProfile.studentID = payload.studentID;
      state.studentProfile.email = payload.email;
      state.studentProfile.firstName = payload.first_name;
      state.studentProfile.lastName = payload.last_name;
    },

    CLEAR_STUDENT(state) {
      state.currentStudent = null;
    },
};
