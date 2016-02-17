/**
 * Define all global variables here
 * */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array = [
    {studentName: 'first', course: 'frist', studentGrade: '0', deleted:false},
    {studentName: 'second', course: 'secnod', studentGrade: '50', deleted:false},
    {studentName: 'third', course: 'thrid', studentGrade: '100', deleted:false},
    {studentName: 'four', course: 'fore', studentGrade: '25', deleted:false},
    {studentName: 'fifth', course: 'fiff', studentGrade: '75', deleted:false}
];

/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
var inputIds = ['studentName','course','studentGrade'];
/**
 * addClicked - Event Handler when user clicks the add button
 */
function add_button(){
    addStudent();
    updateData();
    clearAddStudentForm();
}
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClicked() {
    clearAddStudentForm();
}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @return undefined
 */

function addStudent() {
    console.log('addStudent function');
    var new_student  = {};
    for (var i = 0; i < inputIds.length; i++) { //looping through inputIds and using jquery to get value using html classes
        var student_index = inputIds[i];
        var value = $('#' + student_index).val();
        student_obj[student_index] = value;
        console.log('index: ', student_index);
        console.log('value: ', value);
    }

    var matchNotFound = true;
    for (student in student_array) {
        //if already present, don't put into array
        if (student_array[student].studentName == new_student.name &&
            student_array[student].course == new_student.course &&
            student_array[student].deleted == false) {
            matchNotFound = false;
            break;
        }
    }
    //if not present, add to array
    if (matchNotFound) {
        student_array.push(new_student);
    }
    return;
}
/**
  clearAddStudentForm - clears out the form values based on inputIds variable
 */
//function clearAddStudentForm(){
//    $("#studentName").val('');
//    $("#course").val('');
//    $("#studentGrade").val('');
//    console.log('empty all field:');
//}
function clearAddStudentForm() {
    for (var i = 0; i < inputIds.length; i++) {
        var index = inputIds[i];
        $('#' + index).val("");
    }
}

function removeStudent(studentObj)
{
    student_array[student_array.indexOf(studentObj)]
}

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage() {
    var total = 0;
    var average= 0;
    for (var i = 0; i < student_array.length; i++) { //looping through student_array for studentGrade and add to total
        total += parseFloat(student_array[i].studentGrade);
    }
    average = Math.round(total / student_array.length); //Calculation for the average
    console.log('average: ', average);
    return average;
}
/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData() {
    var average = calculateAverage();
    $('.avgGrade').html(average);
    updateStudentList();
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList() {

    $('.student-list > tbody').html('');

    for(var i = 0; i < student_array.length; i++){
        var student_object = student_array[i];
        console.log('updateStudentList function, student object: ', student_object);
        addStudentToDom(student_object);
    }
    if (student_array.length == 0) {
        var user_unavail_msg = $('<td>').attr("colspan", 6).append($('<h2>').html("User Info Unavailable"));
        $('.student-list tbody').html(user_unavail_msg);
    }
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(studentObj){

    //TODO: don't do a loop here, pass in one object at a time via the parameter studentObj
        var newStudentName = $("<td>").html(studentObj.studentName);
        var newStudentCourse = $("<td>").html(studentObj.course);
        var newStudentGrade = $("<td>").html(studentObj.studentGrade);
        var newTableRow = $("<tr>");
        newTableRow.append(newStudentName,newStudentCourse,newStudentGrade);
        $(".student-list tbody").append(newTableRow);
}
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset() {
    student_array = [];
    clearAddStudentForm();
    updateData();
}
/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(function () {
    reset(); //reset function loaded to reset application to default state
});