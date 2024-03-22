import IssueCard from './IssueCard';
import { useDrag } from 'react-dnd';


const ItemType = 'ISSUE_ITEM';

const Item = ({ data, eliminaItem }) => {
    const [{ isDragging }, drag_ref] = useDrag({
        type: ItemType,
        item: { type: ItemType, id: data.id }
    });


    return <IssueCard reference={drag_ref} isDragging={isDragging} data={data} remove={eliminaItem} />;
};


export default Item