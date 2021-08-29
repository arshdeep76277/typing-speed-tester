import Navbar from './components/Navbar'
import './App.css';
import Footer from './components/Footer'
import Jabber from 'jabber'; 
import TestContainerModified from './components/TestContainerModfied';
function App() {
  const jabber=new Jabber;
  const data=jabber.createParagraph(30);
  return (
    <div className="App">
      <Navbar />
      <TestContainerModified text={data}/>
      <Footer />
    </div>
  );
}

export default App;
