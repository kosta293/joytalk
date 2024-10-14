import React, { useEffect, useRef } from "react"
import data from "@emoji-mart/data"
import { Picker, PickerProps } from "emoji-mart"

const EmojiPicker = (props: PickerProps | Readonly<PickerProps> | any) => {
    const ref = useRef() as React.MutableRefObject<HTMLInputElement>

    useEffect(() => {
        new Picker({ ...props, data, ref })
    }, [props])

    return <div ref={ref} />
}

export default EmojiPicker;