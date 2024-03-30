

const getColorByType = ({ issue_type }) => {

    if (issue_type === 'bug') {
        return 'bg-emerald-200';
    } else if (issue_type === 'story') {
        return 'bg-amber-100';
    } else { // task
        return 'bg-red-200'
    }
}


const IssueCard = ({ data, reference, isDragging, remove }) => {

    return (
        <>
            <div ref={reference} className={"flex flex-col border p-2 m-3 rounded-xl " + getColorByType(data)}>
                <div>{data.title} </div>
                <div>Priority: {data.priority}</div>

                <div>Assigned to: </div>

                <button className="border border-black p-2 text-black rounded-xl" onClick={() => remove(data)}>Elimina</button>
            </div>
        </>
    )
}

export default IssueCard