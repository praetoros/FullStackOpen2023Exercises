const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    let course;
    for (let i = 0; i < courses.length; i++) {
        course = (
            <>
                {course}
                <Course course={courses[i]}/>
            </>
        )
    }

    return (
        <div>
            {course}
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content course={course}/>
            <Total parts={course.parts}/>
        </div>
    )
}

const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    )
}

const Content = ({course}) => {
    let parts;
    for (let i = 0; i < course.parts.length; i++) {
        parts = (
            <>
                {parts}
                <Part part={course.parts[i].name} exercise={course.parts[i].exercises}/>
            </>
        )
    }
    return (
        <>
            {parts}
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>{props.part} {props.exercise}</p>
        </>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce(
        (accumulator, currentValue) => {
            if (isNaN(accumulator)) {
                accumulator = accumulator.exercises;
            }
            return accumulator + currentValue.exercises;
        }
    );
    return (
        <>
            <p><b>Total of {total} exercises</b></p>
        </>
    )
}

export default App