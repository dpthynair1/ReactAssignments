import  {useState}from 'react'

const useDocument = () => {
    const [title, setTitle] = useState({});

    const handleSubmit = (event) => {
      if (event) {
        event.preventDefault();
        console.log(title);

        document.title = title.title
      }
    }
    const handleInputChange = (event) => {
    //   event.persist();
    //  setTitle(title => ({...title, [event.target.name]: event.target.value}));
     // setTitle(title => ({title: event.target.value}));
     setTitle({title: event.target.value});
    }

    
  

    return {
      handleSubmit,
      handleInputChange,
      title
    };
  }

export default useDocument;