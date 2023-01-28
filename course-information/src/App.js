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

    return (
        <div>
            <Header course={course.name}/>
            <Part part={course.parts[0].name} exercise={course.parts[0].exercises}/>
            <Part part={course.parts[1].name} exercise={course.parts[1].exercises}/>
            <Part part={course.parts[2].name} exercise={course.parts[2].exercises}/>
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


const Part = (props) => {
    return (
        <>
            <p>{props.part} {props.exercise}</p>
        </>
    )
}

const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
        </>
    )
}

export default App