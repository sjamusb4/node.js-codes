fn main() {
    //data types

    let x: i32 = 1; // integer
    let y: f64 = 1.0; // floating point
    let z: bool = true; // boolean
    
    // println!("{}", x);
    // println!("{}", y);
    // println!("{}", z);

    //Strings
    // String::from creates a new String from a string literal
    // (literal is a fixed value that is hardcoded into the program)
    // // another way to create a string
    // let s2: &str = "Hello, Rust!"; // &str is a string slice, which is a reference to a string literal
    // println!("{}", s2);


    let mut s: String = String::from("Hello, Rust!"); // String
   // println!("{}", s);

    s.push_str(" Welcome to Rust programming."); // push_str is a method that appends a string slice to a String
    //println!("{}", s);

    //arrays - fixed-size collections of elements of the same type
    let arr: [i32; 5] = [1, 2, 3, 4, 5]; // array of integers with a fixed size of 5
   // println!("{:?}", arr); // {:?} is a debug format specifier that prints the array in a readable format
    //println!("First element: {}", arr[0]); // accessing the first element of the array
    //println!("Length of the array: {}", arr.len()); // length of the array
    
    //vectors - dynamic arrays that can grow or shrink in size
    let mut vec2: Vec<i32> = vec![1, 2, 3]; // create a new vector with initial values 
    //vec! is a macro that creates a new vector with the given values
    //println!("{:?}", vec2); // print the vector
    //println!("First element: {}", vec2[0]); // accessing the first element of the vector
    
    //another way to create a vector
    let mut vec: Vec<i32> = Vec::new(); // create a new empty vector of integers
    vec.push(1); // push is a method that adds an element to the end of the vector
    vec.push(2);
    //println!("{:?}", vec); // print the vector
    //println!("First element: {}", vec[0]); // accessing the first element of the vector

    //conditional statements
    let num: i32 = 10;
    if num > 5 {
        println!("{} is greater than 5", num);
    } else {
        println!("{} is not greater than 5", num);
    }

    //loops
    for i in 0..5 { // for loop that iterates from 0 to 4
        println!("i: {}", i);
    }

    let mut count: i32 = 0;
    while count < 5 {
        println!("count: {}", count);
        count += 1;
    }

    loop { // infinite loop
        println!("This is an infinite loop");
        break; // break is used to exit the loop
    }

    //functions
    fn add(a: i32, b: i32) -> i32 {
        return a + b; 
    }

    let result: i32 = add(5, 10);
    println!("Result of add(5, 10): {}", result);

    //IMP
    //ownership and borrowing

    //without borrow

    let abc = String::from("Hello, Rust!"); // abc owns the string
    println!("abc: {}", abc); // abc can be used to access the string

    let length = get_length(abc); // ownership of the string is moved to the get_length function
    // from this line onwards, abc is no longer valid because its ownership has been moved to the get_length function
    println!("Length of the string: {}", length); 
    println!("abc: {}", abc); // this will also cause an error because abc is no longer valid after being moved to the get_length function
    //solution is=>
    // return the ownership of the string back to the main function after calculating its length in the get_length function
    // or borrow the string instead of moving its ownership to the get_length function, so that the main function can still access it after the get_length function is called.
 
    //example of returning ownership in Rust
    let xyz = String::from("Hello, Rust!"); // xyz owns the string
    let (len1, str1) = get_length2(xyz); // get_length_and_return_ownership function takes ownership of the string and returns both the length and the string back to the main function
    //str1 is the string that is returned by the get_length_and_return_ownership function, and len1 is the length of the string
    println!("Length of the string: {}, String: {}", len1, str1); // main function can still access the string because its ownership was returned by the get_length_and_return_ownership function

    //example of borrowing in Rust
    let str = String::from("Harkirat");
    let len = get_length1(&str);
    println!("{} {}", str, len);
    
    //with borrow

    let s1: String = String::from("Hello, Rust!"); // s1 owns the string
    let s2: &String = &s1; // s2 borrows the string from s1
    println!("s1: {}, s2: {}", s1, s2); // both s1 and s2 can be used to access the string
    
    //example of ownership and borrowing in Rust
    //Ownership is a key concept in Rust that ensures memory safety without a garbage collector.
    //Each value in Rust has a single owner, and when the owner goes out of scope, the value is dropped (deallocated).
    //Borrowing allows you to reference a value without taking ownership of it.

    //heap and stack
    //In Rust, data can be stored on the stack or the heap.
    //The stack is a region of memory that stores values with a known, fixed size at 
    //compile time. The heap is a region of memory that stores values with a dynamic size at runtime.
    //Values stored on the stack are automatically deallocated when they go out of scope, while
    //values stored on the heap must be manually deallocated using the drop function or by going out of scope.  

}

//normal function that takes ownership of the string and returns its length
fn get_length(s: String) -> usize { // ownership of the string is taken by the get_length function (s vaiable got onwership of the string)
    return s.len(); 
}

// with borrowing, the get_length1 function takes a reference to the string instead of taking ownership of it,
fn get_length1(str: &String) -> usize {
    let len = str.len();
    return len
}

// function that takes ownership of the string and returns both the string and its length
 fn get_length2(s: String) -> (String, usize) { // ownership of the string is taken by the get_length2 function (s vaiable got onwership of the string)
    let len = s.len(); 
    return (s, len); // return the ownership of the string back to the main function along with its length
}