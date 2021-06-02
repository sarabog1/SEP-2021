
import BasePage, { BasePageProperties } from '../BasePage/BasePage';
import { Link } from "react-router-dom";
class SalonPageProperties extends BasePageProperties{
    match?: {
        params:{
            cid: string;
                }
    }
}

class SalonPageState{
    title: string="";
    name: string ="";
    salonId: number[]=[];
    locationId: number[] = [];
    serviceId: number[] = [];
}

export default class SalonPage extends BasePage<SalonPageProperties> {
    state: SalonPageState;

    constructor(props: SalonPageProperties){
        super(props);

        this.state = {
            title: "",
            name: "",
            salonId:[],
            locationId: [],
            serviceId: [],
        };
    } 

    private getSalonId():number|null {
      const cid= this.props.match?.params.cid;

      return cid ? +(cid) : null;
    }

    private getsalonData(){
        const cId = this.getSalonId();

        if(cId === null){
            this.setState({
                title: "all salons",
                name:"Salon1",
                salonId: [1,2,3,4],
                
            }
            )
        }
        else {
            this.setState({
                title: "Salon" + cId,
                name:"Salon pod imenom" +cId,
                salonId:[
                    cId+2,
                    

                ],
                locationId: [
                    cId + 10,
                    
                ],
                serviceId: [
                    cId + 15,
                   
                ]
            })
        }
    }

    componentDidMount(){
        this.getsalonData();
    }
    componentDidUpdate(prevProps: SalonPageProperties, prewState: SalonPageState){
        if (prevProps.match?.params.cid !== this.props.match?.params.cid){
            this.getsalonData();
        }
    }

    renderMain(): JSX.Element{

        
        return(
            <>
            <h1>{ this.state.title } </h1>
            
            <ul>
            {
                this.state.salonId.map(sal => (
                    <li>
                        <Link to={"/salons/" + sal }>
                            Ime {this.state.name}
                            Lokacija {sal}
                            Usluga {sal}

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