
import './employers-list-item.css'

const EmployersListItem = (props) => {
 

            const {name,salary, onDelete, onToggleProp, increase, elected} = props;
            let classNames = `list-group-item d-flex justify-content-between `
            if (increase === true){
                classNames += ' increase'
            }   

            if (elected) {
                classNames += ' like'
            }
             return (
                 <li className={classNames}>
                     <span onClick={onToggleProp} data-toggle="elected" className="list-group-item-label">{name}</span>
                     <input className="list-group-item-input" type="text" defaultValue={salary + '$'} />
                     <div className="d-flex justify-content-center align-items-center">
                         <button className="btn-cookie btn-sm" type="button"
                         onClick={onToggleProp} data-toggle="increase" >
                             <i className="fas fa-cookie"></i>
                             </button>
          
                     <button onClick={onDelete} className="btn-trash btn-sm" type="button">
                             <i className="fas fa-trash"></i>
                     </button>
                     <i className="fas fa-star"></i>
                     </div>
                 </li>
             )
        }



export default EmployersListItem;