import ElegantSendEmailForm from './elegant/ElegantSendEmailForm'
import BasicSendEmailForm from './basic/BasicSendEmailForm'

const SendEmailForm = ({style}: {style: any}) => {
    if (style.variation === 'elegant') {
        return <ElegantSendEmailForm  style={style}/>
    }
    if (style.variation === 'basic') {
        return <BasicSendEmailForm  style={style}/>
    }

    return (
        <div>SendEmailForm</div>
    )
}

export default SendEmailForm;