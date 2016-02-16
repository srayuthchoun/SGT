/**
 * Define all global variables here
 */
var student_name;
var student_course;
var student_grade;
var operations;
var grade_average;
var student_count = 0;
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array = [
    {   student_name : 'Eric Johnson',
        student_course:'math',
        student_grade: 80
    },
    {   student_name : 'Danial Paschal',
        student_course:'Science',
        student_grade: 100
    },
    {   student_name : 'Eric Johnson',
        student_course:'Science',
        student_grade: 60
    }
];

/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */

/**
 * addClicked - Event Handler when user clicks the add button
 */
function add_button(){
    $('add_student').click(function(){


    });
}

/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancle_button(){
    $('cancle_student').click(function(){

    });
}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */

/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculate_average(student_array){
    var max_avg= student_array[0].student_grade;
    console.log(student_grade);
    var max_number = 0;
    for(var i = 1; i < student_array.length; i++)
    {
        console.log('checking '+student_array[i].student_grade+' versus '+max_avg);
        if(student_array[i].rating > max_avg){
            max_avg = student_array[i].student_grade;
            max_number = i;
        }
    }
    return max_number;
}
/**
 * updateData - centralized function to update the average and call student list update
 */

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset_application(){

}


/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(function(){
    reset_application();

});