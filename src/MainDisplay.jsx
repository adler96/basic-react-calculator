import './assets/style.css'

function MainDisplay({ content, operator }) {
  return (
    <div className='main-display'>
        <span className="operator">{operator}</span>
        <span className='typed'>{content}</span>
    </div>
  )
}

export default MainDisplay
