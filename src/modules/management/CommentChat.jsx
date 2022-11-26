import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function CommentChat({ comments, ticket }) {

    const [orderedComments, setOrderedComments] = useState([])

    const user = useSelector(store => store.authReducer)
    console.log('User', user)

    const orderComments = () => {
        const newComments = comments;
        // newComments.forEach( c => console.log(c.createdAt))
        // for (let i = 0; i < newComments.length-1; i++) {
        //     let actualComment = newComments[i];
        //     let nextComment = newComments[i+1]
        //     let currectCommentDate = Date.parse(actualComment.createdAt);
        //     let nextCommentDate = Date.parse(nextComment.createdAt);
        //     console.log(currectCommentDate)

        //     if (currectCommentDate > nextCommentDate) {
        //         let tempComment = newComments[i];
        //         newComments[i] = nextComment;
        //         newComments[i+1] = tempComment;

        //         }

        //     newComments.forEach( c => console.log(c.createdAt))

        // }
        // for (let i = 0; i < newComments.length-1; i++) {
        //     let actualComment = newComments[i];
        //     for (let j = i + 1; j < newComments.length-1; j++) {
        //         let compareComment = newComments[j]
        //         let currentCommentDate = Date.parse(actualComment.createdAt);
        //         let compareCommentDate = Date.parse(compareComment.createdAt);


        //         if (currentCommentDate > compareCommentDate) {
        //             let tempComment = newComments[i];
        //             newComments[i] = compareComment;
        //             newComments[j] = tempComment;

        //             }



        //     }

        // }
        for (let i = 0; i < newComments.length - 1; i++) {
            let actualComment = newComments[0];
            for (let j = 0; j < newComments.length - 1; j++) {
                let compareComment = newComments[j]
                let currentCommentDate = Date.parse(actualComment.createdAt);
                let compareCommentDate = Date.parse(compareComment.createdAt);


                if (currentCommentDate > compareCommentDate) {
                    let tempComment = newComments[i];
                    newComments[i] = compareComment;
                    newComments[j] = tempComment;

                }



            }

        }
        console.log(newComments)
    }

    useEffect(() => {
        orderComments()
    })

    return (
        <div className='bg-[#f5f5f5] w-full flex flex-col max-w-[700px] items-center p-10 rounded'>
            <div className='flex justify-start w-full'>
                <p className='text-xl'>Comentarios</p>
            </div>
            {comments.map(comment => {
                return (
                    <div className={` flex w-full ${user.user.id == comment.user.id ? 'justify-end' : comment.user.id == ticket.managerId ? ' justify-end ' : 'justify-start'}`}>
                        <div className={`relative bg-[#fff] flex  flex-col p-8 w-[50%] rounded my-6 ${user.user.id == comment.user.id ? ' left-[0] items-end' : ' items-start text-[#4f5052]'}`}>
                            <div className={` py-1 px-2 flex  flex-col w-[auto] bottom-[-40px] rounded right-[10px] ${user.user.id == comment.user.id ? ' items-end' : ' items-start'}`}>
                                <p className='text-sm'>{`${comment.user.firstname} ${comment.user.lastname}`}</p>
                                <p>{comment.createdAt.split('T')[0]}</p>
                            </div>
                            <p className={`px-5 py-2 rounded-2xl${user.user.id == comment.user.id ? ' text-white bg-[#0066ff]' : ' bg-[#f5f5f5]'}`}>{comment.response}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
