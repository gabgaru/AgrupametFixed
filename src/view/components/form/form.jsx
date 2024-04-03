import style from './form.module.css'

const CustomInput = ({ ...props }) => {

    return (
        <>
            <div className={style.input_wrapp}>
                {props.label &&
                    <p className={style.label}>
                        {props.label}
                    </p>
                }
                <div className={style.input_container}>
                    {props.preffixIcon &&
                        <div className={style.input_icon}>
                            {props.preffixIcon}
                        </div>
                    }

                    <input
                        id={props.id}
                        type={props.type}
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange}
                        name={props.name}
                        required = {props.required}

                    />

                    {props.suffixIcon &&
                        <div onClick={props.onClick} className={style.input_icon}>
                            {props.suffixIcon}
                        </div>
                    }

                </div>
            </div>
        </>
    )
}


export default CustomInput