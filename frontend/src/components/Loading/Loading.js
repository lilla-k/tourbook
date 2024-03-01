import './Loading.css';

function Loading(){

    console.log("loading")
    return(<div className="lds-ellipsis">
        <div></div><div></div><div></div><div></div>
    </div>)
}

export default Loading;