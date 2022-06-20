import { Component, useTransition } from 'react';
import './app.css';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';




class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                { name: 'Ступин Константин', salary: 1500, increase: false, elected: true, id: 1 },
                { name: 'Николай Чараев', salary: 3300, increase: false, elected: true, id: 2 },
                { name: 'Володина Анастасия', salary: 1540, increase: false, elected: true, id: 3 },
                { name: 'Безносов Волан-де-Морт', salary: 800, increase: false, elected: false, id: 4 },
            ],
            term:'',
            filter:''
        }
        this.maxId = 5;
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }
    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            elected: false,
            id: this.maxId++
        }
        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }


    onToggleProp = (id,prop) => {
        this.setState(({ data }) => ({
            data: data.map((item) => {
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] }
                }
                return item;
            })
        }))
    }


    searchEmp = (items,term) => {
        if (term.length === 0){
            return items
        }else{
            return items.filter(elem => {
                return elem.name.indexOf(term) > -1 
            })
        }
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }


   filterPost = (items,filter) => {
        switch(filter){
            case 'elect': 
            return items.filter(item => item.elected)
            case 'moreThen1000':
            return items.filter(item => item.salary > 1000)
            default:
                return items
        }
   }

   onFilterSelect = (filter) => {
        this.setState({filter})
   }

    render() {
        const {data,term,filter} = this.state
        const employers = this.state.data.length
        const increased = this.state.data.filter(item => item.increase).length
        const visibleData = this.filterPost(this.searchEmp(data,term),filter)
        return (
            <div className="app">
                <AppInfo employers={employers} increased={increased} />
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmployersList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                />
                <EmployersAddForm
                    onAdd={this.addItem}
                />
            </div>
        )
    }
}

export default App;
