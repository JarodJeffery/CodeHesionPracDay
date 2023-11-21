import './Word.css';

export default function WordList({ books, id }){
    return(
        <ol className='wordsList'>
            {books.map((item) =>{
                return (
                    item.categories.map((cat) =>{
                        return (
                            <>
                                {console.log('cat ' ,item)}
                                {cat.id == id &&
                                    <li key={item.name}>
                                        <h1>{item.name}</h1>
                                        <p>Published: {item.published ? 'Yes': 'No'}</p>
                                        <p>Description: {item.description ===null ? 'Cannot find ' : item.description}</p>
                                        {item.categories.map((cate) =>{
                                            return(
                                                <p>
                                                    Category: {cate.name}
                                                </p>
                                            );
                                        })}     
                                    </li>
                                }
                            </>
                        );
                    })
                );
            })}
           
        </ol>
    );
}