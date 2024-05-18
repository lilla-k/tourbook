import { useRouteError } from "react-router-dom";
import './ErrorPage.css';


function ErrorPage() {

    const error = useRouteError();
    console.error(error);
    console.log("message", error.message);

    return (
        <div className="ErrorPage">
            <div className="ErrorPage-textContainer">
                <h1>Oops!</h1>
            <p>We are sorry, but an unexpected error has occurred.</p>
            <p>
                <i>{error.message}</i>
            </p>
            </div>
        </div>
    )
}

export default ErrorPage