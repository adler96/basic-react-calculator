import MainDisplay from './MainDisplay'
import SecondaryDisplay from './SecondaryDisplay'
// import PreviewResult from './PreviewResult'
import './assets/style.css'


function Display({ screenContent, operator, top }) {
  return (
    <div className='display'>
      <SecondaryDisplay content={top} />
      <MainDisplay content={ screenContent } operator={operator} />
      {/* <PreviewResult /> */}
    </div>
  )
}

export default Display
