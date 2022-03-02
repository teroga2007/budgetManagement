import SavingsIcon from '../img/icono_ahorro.svg'
import HouseholdIcon from '../img/icono_casa.svg'
import FeedingIcon from '../img/icono_comida.svg'
import HealthIcon from '../img/icono_salud.svg'
import LeisureIcon from '../img/icono_ocio.svg'
import SubscriptionsIcon from '../img/icono_suscripciones.svg'
import OtherIcon from '../img/icono_gastos.svg'
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import Swal from 'sweetalert2'

const iconsDictionary = {
    saving: SavingsIcon,
    feeding: FeedingIcon,
    health: HealthIcon,
    household: HouseholdIcon,
    leisure: LeisureIcon,
    suscriptions: SubscriptionsIcon,
    other: OtherIcon
}

const Expense = ({ expense, setUpdateExpenses, deleteExpense }) => {
    const dateFormat = date => {
        const newDate = new Date(date)
        const options = {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        }
        return newDate.toLocaleDateString('en-US', options)
    }

    const leadingActions = () => (
      <LeadingActions>
        <SwipeAction onClick={() => setUpdateExpenses(expense)}>
          Update
        </SwipeAction>
      </LeadingActions>
    )

    const trailingActions = () => (
      <TrailingActions>
        <SwipeAction
        onClick={() => deleteExpense(expense.id)}>
          Delete
        </SwipeAction>
      </TrailingActions>
    )

    return (
    <SwipeableList>
      <SwipeableListItem
      leadingActions={leadingActions()}
      trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img 
            src={iconsDictionary[expense.category]} 
            alt="expense-icon"
            />
            <div className="descripcion-gasto">
              <p className="categoria">{expense.category}</p>
              <p className="nombre-gasto">{expense.description}</p>
              <p className="fecha-gasto">
                  Added on: {''}
                  <span>{dateFormat(expense.date)}</span>
                </p>
            </div>
          </div>
          <p className="cantidad-gasto">${expense.amount}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Expense;
