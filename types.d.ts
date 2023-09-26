//type for calender onChange
declare type valuePiece = Date | null

//type for image and video preview
declare type Preview = {
    src:string
    name:string
}

declare type CheckboxProps = {
    id:string, 
    onClick:(e: React.ChangeEvent<HTMLInputElement>, value:string)=>void, 
    label:string
}

declare type FileInputProps = {
    handleChange:(e:React.ChangeEvent<HTMLInputElement>, type:string)=>void
    warning:string
    accept:string
    previewName:string
}

declare type TickProp = {
    attachmentType:string
    label:string
    asset:string
    setAttachmentType:(fileType:string)=>void
}

declare type CalenderBoxProps={
    addDate:(value:valuePiece | [valuePiece, valuePiece])=>void
    selectedDate:valuePiece[]
    removeDate:(date:valuePiece)=>void
}

declare type PreviewProps = {
    previewImage:Preview, 
    previewVideo:Preview,
    attachmentType:string, 
    platform:string[],
    needPlatform:boolean
    needMessage:boolean
    writeup:string, 
    plan:string, 
    selectedDate:valuePiece[]
}

declare type Duration = {
    startday:string
    duration:string
}