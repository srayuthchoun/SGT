/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */

var student_array = [];

/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */

var inputIds = ['studentName', 'course', 'studentGrade'];

/**
 * addClicked - Event Handler when user clicks the add button
 */

function addClicked() {
    $('.add_student').click(function () {
        addStudent();
    });
}

/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */

function cancelClicked() {
    $('.cancel_student').click(function () {
        clearAddStudentForm();
    });
}

/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */

function addStudent() {
    console.log('addStudent function');
    var student_obj = {};
    for (var i = 0; i < inputIds.length; i++) { //looping through inputIds and using jquery to get value within the classes
        console.log('loop', i);
        var student_index = inputIds[i];
        var value = $('#' + student_index).val();
        //var value = input.val();
        student_obj[student_index] = value;
        console.log('index: ', student_index);
        console.log('value: ', value);
    }
    student_array.push(student_obj);
    clearAddStudentForm();
}

/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */

function clearAddStudentForm() {
    for (var i = 0; i < inputIds.length; i++) {
        var index = inputIds[i];
        var value = $('#' + index).val("");
    }
}

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */

function calculateAverage() {
    var total = 0;
    var average= 0;
    for (var i = 0; i < student_array.length; i++) {
        total += parseFloat(student_array[i].studentGrade);
    }
    var average = Math.round(total / student_array.length);
    console.log('average: ', average);
    return average;
}

/**
 * updateData - centralized function to update the average and call student list update
 */

function updateData() {
    var average = calculateAverage();
    $('.avgGrade').html(average);

}

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList() {

}

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */

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
    addClicked(); //addClicked function call to add button click function
    cancelClicked(); //cancelClicked function call to cancel button click function
    reset(); //reset function loaded to reset application to default state
});