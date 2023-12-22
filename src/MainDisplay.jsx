import './assets/style.css'

function MainDisplay({ content }) {
  return (
    <div className='main-display'>
        <span className="operator"></span>
        <span className='typed'>{content}</span>
    </div>
  )
}

export default MainDisplay
