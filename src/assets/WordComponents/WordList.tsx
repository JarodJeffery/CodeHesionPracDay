export default function WordList({ books, id }){


    return(
        <ol>
            {books.map((item) =>{
                return (
                    item.categories.map((cat) =>{
                        return (
                            <>
                                {console.log('cat ' ,item)}
                                {cat.id == id &&
                                    <li key={item.name}>
                                        <h1>{item.name}</h1>
                                        <p>{item.published}</p>
                                        <p>{item.description}</p>
                                        {item.categories.map((cate) =>{
                                            return(
                                                <p>
                                                    {cate.name}
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