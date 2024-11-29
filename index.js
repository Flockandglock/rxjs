const {Observable} = require("rxjs");
const {map} = require("rxjs/operators");

const users = {
    data: [
        {
            gender: 'male',
            age: 29
        },
        {
            gender: 'female',
            age: 13
        },
        {
            gender: 'male',
            age: 23
        },
        {
            gender: 'female',
            age: 53
        },
        {
            gender: 'female',
            age: 18
        }
    ]
};

const observable = new Observable((subscriber) => {
    subscriber.next(users);
});



const observer = {
    next: (value) => {
        console.log('next ' + value);
    },
    error: (error) => {
        console.log('error ' + error);
    },
    complete: () => {
        console.log('stream is complete')
    }
};

// Выводим средний возраст female
observable.pipe(
    map(obj => {
        return obj.data.filter(item => item.gender === 'female');
    }),
    map(data => {
        let sumAge = 0;
        data.forEach(element => {
            sumAge = sumAge + element.age;
        });
        return sumAge / data.length;
    })
).subscribe(observer);
