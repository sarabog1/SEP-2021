
import BasePage from '../BasePage/BasePage';


export default class HomePage extends BasePage<{}> {
    renderMain(): JSX.Element{
        return(
            <p>Ovo je pocetna stranica</p>
        )
    }
}