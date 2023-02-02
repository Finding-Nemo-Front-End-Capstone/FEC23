import React from 'react';
import QuestionsList from './QuestionsList.jsx';

function Questions({product}) {
  const [expanded, setExpanded] = useState(true);
  const [buttonText, setButtonText] = useState('Collapse');
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    console.log('product id', product);
    axios({
      url: `/db/questions?product_id=${product.id}&page=${1}&count=${100}`,
      method: 'GET',
    })
      .then((response) => { setQuestions(response.data.results); });
  }, [product]);
  // handles button text change
  function handleAccordion() {
    buttonText === 'Collapse' ? setButtonText('Expand') : setButtonText('Collapse');
    setExpanded(!expanded);
  }
  return (
    <div>
      <QuestionsList product={product} />
    </div>
  );
}

export default Questions;
