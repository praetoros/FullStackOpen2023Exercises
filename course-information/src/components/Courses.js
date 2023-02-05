const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content course={course}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course

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
