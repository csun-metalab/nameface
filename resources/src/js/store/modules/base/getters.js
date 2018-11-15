export default {
  // General
  courses: state => state.courses,
  students: state => state.students,
  displaySideMenu: state => state.displaySideMenu,
  errors: state => state.errors,
  permission: state => state.imagePermission,
  currentLocation: state => state.currentLocation,
  uploadFeedback: state => state.uploadFeedback,

  // Back Button
  hideBack: state => state.hideBack,
  disableBack: state => state.disableBack,

  // Themes
  themeName: state => state.themeName,

  // Views & Sorting
  flashroster: state => state.flashroster,
  list: state => state.list,
  flash: state => state.flash,
  sortLastName: state => state.sortLastName,
  sortAscending: state => state.sortAscending,

  // Courses
  semester: state => state.semester,
  termYear: state => state.termYear,
  term: state => state.term,
  selectedTerm: state => state.selectedTerm,
  loadingClasses: state => state.loadingClasses,
  currentCourse: state => state.currentCourse,

  // User
  facultyMember: state => state.facultyMember,
  facultyFullName: state => `${state.facultyMember.firstName} ${state.facultyMember.lastName}`,
};
