console.log("this is module");

function avg (arr){
    sum = 0;
    arr.forEach(element => {
        sum += element;
    });
    return sum/arr.length;
}

// module.exports = {
//     avrg : avg,
//     name : "book",
//     repo : "github"
// }

module.exports.name = "harry";