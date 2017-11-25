export {
  config,
  log,
  Sayable,
  VERSION,
}                     from './src/config'
export { Contact }    from './src/contact'

// ISSUE #70 import { FriendRequest }  from './src/friend-request'
export {
  PuppetElectronFriendRequest as FriendRequest,
}                     from './src/puppet-electron/friend-request'
export {
  MsgType,
}                     from './src/puppet-electron/schema'

export { IoClient }   from './src/io-client'
export {
  Message,
  MediaMessage,
}                     from './src/message'
export { Profile }    from './src/profile'
export { Puppet }     from './src/puppet'
export { PuppetElectron }  from './src/puppet-electron/'
export { Room }       from './src/room'
export { Misc }       from './src/misc'

import Wechaty from './src/wechaty'
export { Wechaty }
export default Wechaty
