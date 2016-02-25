/**
 * Define all global variables here
 **/
var apiKey = '6AUO9AMoSM';
/**
 * student_array - global array to hold student objects
 * @type {Array}
 **/
var student_array = [];
/**
 * inputIds - id's of the elements that are used to add students more testing
 * @type {string[]}
 **/
var inputIds = ['name', 'course', 'grade'];
/**
 * addClicked - Event Handler when user clicks the add button
 **/
function addClicked() {
    addStudent();
    clearAddStudentForm();
}
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 **/
function cancelClicked() {
    clearAddStudentForm();
}
/**
 * getDataClicked - Event Handler when user clicks the get Data from Server button, should pull data from LFZ server
 **/
function getDataClicked() {
    callDatabase();
}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @return undefined
 **/
function addStudent() {
    console.log('addStudent function');
    var new_student = {};
    for (var i = 0; i < inputIds.length; i++) { //looping through inputIds and using jquery to get value using html classes
        var student_index = inputIds[i];
        var value = $('#' + student_index).val();
        new_student[student_index] = value;
        console.log('index: ', student_index);
        console.log('value: ', value);
    }

    new_student['deleted'] = false;

    //if any fields are empty, invalid entry, don't put in array
    if ((new_student.name == '') ||
        (new_student.course == '') ||
        (new_student.grade == '')) {
        return;
    }

    console.log("name: ", new_student.name, "course: ", new_student.course, "grade: ", new_student.grade);
    sendData(new_student.name, new_student.course, new_student.grade);
    updateData();
}
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 **/
function clearAddStudentForm() {
    for (var i = 0; i < inputIds.length; i++) {
        var index = inputIds[i];
        $('#' + index).val("");
    }
}
/**
 * removeStudent - find the student object to be deleted in the array, and set it's 'deleted' to true
 **/
function removeStudent(studentObj) {
    student_array[student_array.indexOf(studentObj)].deleted = true;
}
/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 **/
function calculateAverage() {
    var total = 0;
    var average = 0;
    var deletedEntries = 0;
    //if nothing in array, return 0
    if (student_array.length > 0) {
        for (var i = 0; i < student_array.length; i++) {
            //if valid entry, add to total
            if (student_array[i].deleted == false) {
                total += parseFloat(student_array[i].grade);
            }
            //if not, skip and add to deleted entries count
            else {
                deletedEntries++;
            }
        }
        //if more than 1 valid entry, calculate average
        if (student_array.length > deletedEntries) {
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
    //updateStudentList(); Function call was used for v0.5
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 **/
function updateStudentList() {
    var currentName;
    var currentCourse;

    for (student in student_array) {//loop through student_array
        //if entry deleted, skip to next
        if (student_array[student].deleted) {
            continue;
        }
        //take name and course
        currentName = student_array[student].name;
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
                (row.find('td:nth-of-type(2)').text() == currentCourse)) {
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
 **/
function addStudentToDom(studentObj)//meant to add one student to the DOM, one object in the array
// is passed into this function

{
    var studentRow = $('<tr>');//studentRow is now a table row
    //var studentNameTD = $('<td>').text(studentObj.name);
    var studentNameTD = $('<td>', {
        text: studentObj.name
    });
    var studentCourseTD = $('<td>', {
        text: studentObj.course
    });
    var studentGradeTD = $('<td>', {
        text: studentObj.grade
    });
    var studentButtonTD = $('<td>');
    var delete_button = $('<button>', {
        type: 'button',
        class: 'btn btn-danger',
        text: 'Delete'
    });
    /**
     * Add an anonymous function as the click handler to the dynamically created delete button for each student row - (Event Delegation)
     * Delete button click handler function should have a call to removeStudent function that removes the object in the student_array*
     **/
    delete_button.click(function () {
        removeStudent(studentObj);
        $(this).parent().parent().remove();
        updateData();
        console.log('delete id: ', studentObj.id);
        deleteData(studentObj.id);

    });
    studentButtonTD.append(delete_button);
    studentRow.append(studentNameTD, studentCourseTD, studentGradeTD, studentButtonTD);
    $('tbody').append(studentRow);

    updateData();
}
/**
 * callDatabase - Ajax call to get data from Learning Fuze server
 **/
function callDatabase() {
    $('.student-list > tbody').html('');
    $('<h3>').appendTo('tbody');
    $('tbody h3').text("Loading Data...");
    $('.get_data').html('<img id="img-spinner" src="images/ajax-loader.gif"/>');
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            api_key: apiKey
        },
        url: "http://s-apis.learningfuze.com/sgt/get",
        success: function (result) {
            if (!result.success) {
                console.log("callDatabase - Could not retrieve data");
            }
            if (result.success) {
                $('.student-list > tbody').html('');
                student_array = [];
                console.log("callDatabase success", result);
                for (var i in result.data) { //loop through the data received from LF
                    student_array.push(result.data[i]); //adding objects from the data to the student array
                    student_array[i]['deleted'] = false; //add deleted values to the objects
                    addStudentToDom(result.data[i]); //add the data to the table
                    $('.get_data').find('img').remove();
                    $('.get_data').text('Get Data From Server');
                }
            }
        },
        error: function (result) {
            console.log("Could not send data");
            alert("Server error, please try again later.");
        }
    });
}
/**
 * sendData- Ajax call to send new student record to Learning Fuze server
 **/
function sendData(student_name, student_course, student_grade) {
    console.log(student_name, student_course, student_grade);
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            api_key: apiKey,
            name: student_name,
            course: student_course,
            grade: student_grade
        },
        url: "http://s-apis.learningfuze.com/sgt/create",
        success: function (result) {
            if (!result.success) {
                console.log("sendData call failed", result);
            }
            if (result.success) {
                console.log("sendData call success", result);
                callDatabase();
            }
        },
        error: function (result) {
            console.log("Could not send data");
            alert("Server error, please try again later.");
        }
    });
}
/**
 * deleteData- Ajax call to delete a student record from Learning Fuze server
 **/
function deleteData(deleted) {
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            api_key: apiKey,
            student_id: deleted
        },
        url: "http://s-apis.learningfuze.com/sgt/delete",
        success: function (result) {
            if (!result.success) {
                console.log("deleteData call failed", result);
                alert("Unable to delete you are not authorized.")
                callDatabase();
            }
            if (result.success) {
                console.log("deleteData call success", result);
                callDatabase();
            }
        },
        error: function (result) {
            console.log("Could not send data");
            alert("Server error, please try again later.");
        }
    });
}
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 **/
function reset() {
    student_array = [];
    updateData();
    clearAddStudentForm();
}
/**
 * Listen for the document to load and reset the data to the initial state
 **/
$(document).ready(function () {
    reset(); //reset function loaded to reset application to default state
    callDatabase();
});
