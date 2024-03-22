import { useDrop } from 'react-dnd';

const ItemType = 'ISSUE_ITEM';

const Box = ({ children, caixa, mouItem }) => {
    const [{ isOver }, drop_ref] = useDrop({
        accept: ItemType,
        drop: (item) => {
            mouItem(item, caixa.state)
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });
    return (
        <div ref={drop_ref} className={`bg-white shadow-lg p-3 min-h-[350px] rounded-xl border ${isOver ? 'border-blue-500' : ''}`}>
            <h2 className="text-xl text-center mb-4" >{caixa.titol}</h2>
            {children}
        </div>
    );
};


export default Box