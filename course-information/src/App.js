const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return <Course course={course}/>
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
        (accumulator, currentValue) => accumulator.exercises ?? accumulator + currentValue.exercises
    );
    return (
        <>
            <p>Number of exercises {total}</p>
        </>
    )
}

export default App