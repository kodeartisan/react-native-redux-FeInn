import * as types from '../actions/actionTypes';

const initialState = {
	topics: {}
};

function reply(topicId , replyId , content , user , state , payload){

  let topic = state.topics.data;

  topic.replies = topic.replies.concat([{
    id : topicId,
    reply_id :replyId,
    content,
    author : user,
    create_at : new Date(),
    ups : []
  }])

  return {
    ...state,
    topics : { data : topic}
  }

}

function upReply(topicId , replyId , userName , isUp , state){

	let topic = state.topics.data;
	// topic.replies = topic.replies
	let inx = topic.replies.findIndex( (v,k,arr) => {
		return v.id == replyId;
	})

	if(isUp){
		topic.replies.map(v =>{
			if(v.id == replyId){
				v.ups.push(userName)
			}
		})
	}
	else{
		topic.replies[inx].ups.map( (v,k) =>{
			if(v == userName ){
				topic.replies[inx].ups.splice(k,1);
			}
		})
	}
	
  return {
    ...state,
    topics : { data : topic}
  }
}

export default function Comment (state=initialState , action={}){
  const { payload , meta={} } = action;
  const { topicId, content, replyId , user ,userName } = meta;
  switch (action.type) {
    case types.REPLY_TOPIC:
      return reply(topicId , replyId , content , user , state , payload)
      break;
    case types.GET_TOPIC_DETAIL:
      return Object.assign(
        {} , state , {
          topics : payload
        }
      )
      break;
    case types.UP_REPLY:
      return upReply(topicId , replyId , userName , payload , state)
      break;
    default:
      return state;
  }
}
