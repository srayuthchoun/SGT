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
    {studentName: 'third', course: 'thrid', studentGrade: '100', deleted:true},
    {studentName: 'four', course: 'fore', studentGrade: '25', deleted:false},
    {studentName: 'fifth', course: 'fiff', studentGrade: '75', deleted:false}
];

/**
 * inputIds - id's of the elements that are used to add students more testing
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
        new_student[student_index] = value;
        console.log('index: ', student_index);
        console.log('value: ', value);
    }

    new_student['deleted'] = false;

    //assumes new entry
    var matchNotFound = true;
    //loop through existing array
    for (student in student_array) {
        //if already present, don't put into array
        if (student_array[student].studentName == new_student.studentName &&
            student_array[student].course == new_student.course &&
            student_array[student].deleted == false)
        {
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

/**
 * removeStudent - find the student object to be deleted in the array, and set it's 'deleted' to true
 */
function removeStudent(studentObj)
{
    student_array[student_array.indexOf(studentObj)].deleted=true;
}

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage() {
    var total = 0;
    var average = 0;
    var deletedEntries = 0;
    //if nothing in array, return 0
    if (student_array.length > 0)
    {
        for (var i = 0; i < student_array.length; i++)
        {
            //if valid entry, add to total
            if (student_array[i].deleted == false)
            {
                total += parseFloat(student_array[i].studentGrade);
            }
            //if not, skip and add to deleted entries count
            else
            {
                deletedEntries++;
            }
        }
        //if more than 1 valid entry, calculate average
        if (student_array.length > deletedEntries)
        {
            average = (total / (student_array.length - deletedEntries));
        }
    }
    //if array length <1 OR no un-deleted entries, array is 0
    return average;
}


/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData() {
    var average = +(calculateAverage()).toFixed(2);
    $('.avgGrade').html(average);
    updateStudentList();
    delete_student();
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */

function updateStudentList() {
    var currentName;
    var currentCourse;

    for (student in student_array) {//loop through student_array
        //if entry deleted, skip to next
        if(student_array[student].deleted){
            continue;
        }
        //take name and course
        currentName = student_array[student].studentName;
        currentCourse = student_array[student].course;
        //assumes entry is not already displayed
        var matchNotFound = true;
        //finds number of rows are already displayed in DOM
        var currentRows = $('tr').length;
        //Except for table head, loop through displayed rows
        for (var i = 0; i < currentRows; i++) {
            //target row
            var row = $('tr:nth-of-type(' + (i + 1) + ')');
            //if name-course pair is already displayed, then doesn't need to be added to display
            if (
                (row.find('td:first-of-type').text() == currentName) &&
                (row.find('td:nth-of-type(2)').text() == currentCourse))
            {
                //match found, don't loop further, skip to next entry
                matchNotFound = false;
                break;
            }
        }
        //loops through and none of displayed names are new entry
        if (matchNotFound) {
            //add new entry to DOM
            addStudentToDom(student_array[student]);
        }
    }
}

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */

function addStudentToDom(studentObj)//meant to add one student to the DOM, one object in the array
// is passed into this function
{
    var studentRow = $('<tr>');//studentRow is now a table row
    //var studentNameTD = $('<td>').text(studentObj.name);
    var studentNameTD = $('<td>',{
        text: studentObj.studentName
    });
    var studentCourseTD = $('<td>',{
        text: studentObj.course
    });
    var studentGradeTD = $('<td>',{
        text: studentObj.studentGrade
    });
    var studentButtonTD = $('<td>');
    var delete_button = $('<button>',{
        type: 'button',
        class: 'btn btn-danger',
        text: 'Delete'
    });
    delete_button.click(function(){
        removeStudent(studentObj);
        $(this).parent().parent().remove();
        updateData();
    });
    studentButtonTD.append(delete_button);
    studentRow.append(studentNameTD, studentCourseTD, studentGradeTD, studentButtonTD);
    $('tbody').append(studentRow);
}

//function delete_student_row(){
//    student_array = delete student_array[0];
//}
/*
 Add an anonymous function as the click handler to the dynamically created delete button for each student row - (Event Delegation)
 Delete button click handler function should have a call to removeStudent function that removes the object in the student_array*
* */


/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset() {
    student_array = [];
    updateData();
    clearAddStudentForm();
}
/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(function () {
    updateData();
    //reset(); //reset function loaded to reset application to default state
    //comment out reset to load with dummy data
});