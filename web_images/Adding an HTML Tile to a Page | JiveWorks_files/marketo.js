var mkto = {};
mkto.bookmark = function (ctx)            {  mkto.log('bookmark', ctx.markedObjectType, ctx.markedObjectId); };
mkto.followUser = function (ctx)          {  mkto.log('follow',3,ctx.id);                                    };
mkto.follow = function (ctx)              {  mkto.log('follow',ctx.objectType, ctx.objectID);                };
mkto.joinGroup = function (ctx)           {  mkto.log('join',700,ctx.groupID)                                };
mkto.like = function(command,ctx,element) {  mkto.log('like',command.objectType,command.objectId);           };
mkto.rate = function(command,ctx,element) {  mkto.log('rate',command.objectType,command.objectId);           };
mkto.share = function(command,ctx,element){  mkto.log('share',command.objectType,command.objectId);          };
mkto.log = function(command, objectType, objectID) {
  var trackURL = '/track/'+command+'/'+ objectType +'/'+ objectID;
  mktoMunchkinFunction('clickLink', { href : trackURL });
}; // end function

$j(function() {
   jive.dispatcher.listen("like",mkto.like);
   jive.dispatcher.listen("rate",mkto.rate);
   jive.dispatcher.listen("share",mkto.share);
   jive.switchboard.addListener('bookmark.create',mkto.bookmark);
   jive.switchboard.addListener('sgroup.member.join',mkto.joinGroup);
   jive.switchboard.addListener('follow.user',mkto.followUser);
   jive.switchboard.addListener('follow.create',mkto.follow);
});