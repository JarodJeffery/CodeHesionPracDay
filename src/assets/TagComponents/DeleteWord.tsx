import axios from 'axios';
import { useParams } from 'react-router';

export default function DeleteWord(){
    const token = localStorage.getItem('accessT');
    const { id } = useParams();

    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: 'https://edeaf-api-staging.azurewebsites.net/v1/admin/Tags/'+ id,
        headers: { 
          'Authorization': 'Bearer ' + token, 
          'Cookie': 'ARRAffinity=a9f9761156205d30496df6f366e16e6ba26df4a27a15e946a932cdf71877fd3b; ARRAffinitySameSite=a9f9761156205d30496df6f366e16e6ba26df4a27a15e946a932cdf71877fd3b'
        }
    };
    console.log(config.url);
    axios.request(config)
    .then(response => {
        console.log(response);
        console.log(`Deleted post with ID ${id}`);
    })
    .catch(error => {
        console.error(error);
    });

    return (
        <h1>help</h1>
    );
}