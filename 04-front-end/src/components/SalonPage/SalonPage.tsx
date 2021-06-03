
import BasePage, { BasePageProperties } from '../BasePage/BasePage';
import { Link } from "react-router-dom";
import SalonModel from '../../../../03-back-end/src/components/salon/model';
import SalonService from '../../services/SalonService';

class SalonPageProperties extends BasePageProperties{
    match?: {
        params:{
            cid: string;
                }
    }
}

class SalonPageState{
    title: string="";
    salons: SalonModel[]=[];
    showBackButton: boolean = false;
}

export default class SalonPage extends BasePage<SalonPageProperties> {
    state: SalonPageState;

    constructor(props: SalonPageProperties){
        super(props);

        this.state = {
            title: "",
            salons: [],
            showBackButton: false,
        };
    } 

    private getSalonId():number|null {
      const cid= this.props.match?.params.cid;

      return cid ? +(cid) : null;
    }

    private getSalonData(){
        const cId = this.getSalonId();

        if(cId === null){
           this.apigetAllSalons();
        }
        else {
            this.apiGetSalon(cId);
    }
    }

    private apigetAllSalons(){
        SalonService.getAllSalons()
        .then(salons =>{
            if (salons.length === 0){
                return this.setState({
                    title: "No salons found",
                    salons: [],
                    showBackButton: true,
                });
            }
            this.setState({
                title:"All Salons",
                salons: salons,
                showBackButton: false,
            })
        })
    }
    private apiGetSalon(cId: number){
        SalonService.getSalonById(cId)
        .then(result =>{
            if(result === null){
                this.setState({
                    title:"Salon not found",
                    salons: [],
                    showBackButton: true,
                })

            }
            this.setState({
                title: result?.name,
                salons: result?.salonId,
                showBackButton: false,
            })
        })
    }

    componentDidMount(){
        this.getSalonData();
    }
    componentDidUpdate(prevProps: SalonPageProperties, prewState: SalonPageState){
        if (prevProps.match?.params.cid !== this.props.match?.params.cid){
            this.getSalonData();
        }
    }

    renderMain(): JSX.Element{

        
        return(
            <>
            <h1>{ this.state.showBackButton }
            ? (
                <>
                <Link to={"/salon/" + (this.state.salons ?? '')}>
                    &lt; Back
                </Link>
                    |
                </>
            )
            { this.state.title }
            
             </h1>
            {
                this.state.salons.length > 0
                ? (
                    <>
                    <p>Saloni:</p>
                    <ul>
                        {
                            this.state.salons.map(
                                salon => (
                                    <li key={ "salon-link-" + salon.salonId }>
                                        <Link to={"/salon/" + salon.salonId}>
                                            {salon.name}
                                        </Link>
                                    </li>
                                )
                            )
                        }
                    </ul>
                    
                    </>
                )
                :""
                
            }
            <ul>
            {
                this.state.salons.map(salon => (
                    <li key={"salon-link" + salon.salonId}>
                        <Link to={"/salons/" + salon.salonId }>
                            {salon.name}

                        </Link>
                    </li>
                )
            )
            }
            </ul>
            </>
        )
    }
}
