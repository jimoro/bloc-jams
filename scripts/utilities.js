function forEach(arrayIn, callback) {
        for (var i = 0; i < arrayIn.length; i++) {
        callback(arrayIn[i]);
    }
}


/*
forEach() should:
 - Use a loop to go through all elements in the points array.
 - Execute a callback for each element.
 
 Replace the for loop in the animatePoints function with a forEach block and confirm that the selling points still animate properly.
*/
