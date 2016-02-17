/**
 * Define all global variables here
 */

/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array = [

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
    $('.add_student').click(function(){
        addStudent();
        updateStudentList();
        addStudentToDom();
    });
}
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancle_button(){
    $('.cancel_student').click(function(){
        clearAddStudentForm();
    });
}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @return undefined
 */
function addStudent(){
    var student_obj ={};
    for(i =0 ;i<inputIds.length;i++){
        var student_index = inputIds[i];
        var value = $('#'+student_index).val();
        student_obj[student_index] = value;
        console.log('index: ',student_index);
        console.log('value: ',value);
    }
    student_array.push(student_obj);
}
/**
  clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm(){
    $("#studentName").val('');
    $("#course").val('');
    $("#studentGrade").val('');
    console.log('empty all field:');
}
/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculate_average(){
    var total_grade = 0;
    var aveGrade = 0;
    for(var i=0; i<student_array.length; i++){
        total_grade = total_grade + student_array[i].studentGrade;
    }
    aveGrade = Math.round(total_grade / student_array.length); // avegrade Calculation and divided by total number of student array
    console.log('average: ', aveGrade);
    return aveGrade;

}
/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData(){
    var aveGrade = calculate_average();
    $(".avgGrade").html(aveGrade);
    updateStudentList();
}

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList(){
    for(var i = 0; i < student_array.length; i++){
        var student_object = student_array[i];
        addStudentToDom(student_object);
        //TODO: take the individual object from the array, and pass it to addStudentToDom
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
        $(".student-list > tbody").append(newTableRow);

}

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
    add_button();
    cancle_button();
    updateStudentList();

});