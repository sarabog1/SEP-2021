import axios from 'axios';
import BasePage, { BasePageProperties } from '../BasePage/BasePage';
import { Link } from "react-router-dom";
import SalonModel from '../../../../03-back-end/src/components/salon/model';

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
}

export default class SalonPage extends BasePage<SalonPageProperties> {
    state: SalonPageState;

    constructor(props: SalonPageProperties){
        super(props);

        this.state = {
            title: "",
            salons: [],
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
        axios({
            method: "GET",
            baseURL: "http://localhost/40080",
            url:"/salon",
            timeout: 10000,
            headers: {
                Authorization: "Bearer FAKE_TOKEN"
            },
            //withCredentials: true,
            maxRedirects: 0,
        })
        .then(res =>{
            if(!Array.isArray(res.data)){
                throw new Error("Invalid data recived");
            }


        }) 
        .catch(err =>{
            const error = "" + err;
            if(error.includes("404")){
                this.setState({
                    title:"No caracters found",
                    salons: [],
                   
                })
            } else {
                this.setState({
                    title:"Unable to find",
                    salons: [],
                    
                })
            }
        })
    }
    private apiGetSalon(cId: number){

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
            <h1>{ this.state.title } </h1>
            
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