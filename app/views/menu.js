const html = require('choo/html')

const menuIcon = ({ title, onclick, icon, selected = false, info }) => html`
<div class="tc relative pointer pa3 ${selected?"bg-mid-gray" : ""}" style="flex:0" title=${title} onclick= ${onclick}>
<i class="fas ${icon} dim pointer" style="display:block;" title=${title}
 ></i>
${info?html`<div class="courier b absolute ttu right-0 top-0 b pa1 pr2">${info}</div>` : '' }
</div>
`


module.exports = (state, emit) => {
  const menuItem = (opts) => {
  //  console.log()
    // if(state.layout.collapsed === 1 && opts.advanced ) {
    //   return ''
    // } else {
      return menuIcon(opts)
  //  }
  }

  const screenIcon = ({ title, onclick, icon, selected = false, info }) => html`
  <div class="relative pointer pa3 ${selected?"bg-mid-gray" : ""}" style="flex:0" title=${title} onclick= ${onclick}>
  <i class=" fas ${icon} dim pointer f4" style="display:block;" title=${title}
   ></i>
  ${info?html`<div class="w-100 h-100 pt3 absolute ttu right-0 top-0 tc b courier" style="padding-top:1.03rem">${info}</div>` : '' }
  </div>
  `

  if(state.layout.collapsed == true) {
    console.log('collapsed!!')
    return html`
    <div class=" pa2 flex items-end" style="pointer-events:all;text-shadow:2px 2px 3px rgba(0, 0, 0, 1);color:${state.style.colors.text0}">
    ${menuIcon({
      icon:  'fa-chevron-up',
      title: "Show menu",
      onclick: () => emit('layout:openMenu')
    })}
    </div>
    `
  } else {
    return html`
    <div class="flex flex-column justify-between flex-wrap-reverse" style="pointer-events:all;color:${state.style.colors.text0}">
      <div class="flex flex-column-ns flex-row justify-center">
        ${state.multiPeer.defaultStream !== null ? html`${menuItem({
            icon:  state.multiPeer.user.streamInfo[state.multiPeer.defaultStream.id].isVideoMuted ?'fa-video-slash dark-pink':'fa-video',
            title: "Mute your video",
            onclick: () => emit('user:toggleVideoMute')
          })}
          ${menuItem({
            icon:  state.multiPeer.user.streamInfo[state.multiPeer.defaultStream.id].isAudioMuted ?'fa-microphone-slash dark-pink':'fa-microphone',
            title: "Mute your microphone",
            onclick: () => emit('user:toggleAudioMute')
          })}` : ''}

        ${screenIcon({
          icon: 'fa-desktop',
          title: "Add screen share",
          onclick: () => emit('user:shareScreen'),
          info: '+'
        })}
        ${menuItem({
          icon: 'fa-plus-circle',
          title: "Add media stream",
          onclick: () =>  emit('layout:toggleMenuItem', 'addMedia', 'panels'),
          advanced: true,
          //info: '+'
        })}

        ${menuItem({
          icon: 'fa-phone-slash',
          title: "Leave call",
          // info: 'x',
          onclick: () => emit('user:endCall')
        })}
        </div>
        <div class="flex flex-column-ns flex-row justify-center">
          ${['a', 'b', 'c', 'd'].splice(0, state.layout.settings.numberOfSwitchers).map((switcher) =>menuIcon({
              icon: 'fa-desktop',
              title: `Open switcher ${switcher}`,
              onclick: () => emit('layout:toggleMenuItem', switcher, 'switchers'),
              advanced: true,
              selected: state.layout.switchers[switcher],
              info: switcher
              // classes: state.layout.panels.audio ? "bg-mid-gray" : "bg-dark-gray"
            })
          )}
          ${menuItem({
            icon: 'fa-cog',
            title: "Settings",
            selected: state.layout.panels.settings,
            // info: 'x',
            onclick: () =>  emit('layout:toggleMenuItem', 'settings', 'panels'),
          })}
          ${menuItem({
            icon: 'fa-sliders-h',
            title: "Output volume controls",
            onclick: () => emit('layout:toggleMenuItem', 'audio', 'panels'),
            advanced: true,
            selected: state.layout.panels.audio
            // classes: state.layout.panels.audio ? "bg-mid-gray" : "bg-dark-gray"
          })}
          ${menuItem({
            icon: 'fa-comment',
            title: "Toggle chat",
            onclick: () => emit('layout:toggleMenuItem', 'chat', 'panels'),
            selected: state.layout.panels.chat
            // classes: state.layout.panels.chat ? "bg-mid-gray": ""
          })}
          ${menuItem({
            icon: 'fa-users',
            title: "Show participant list",
            onclick: () => emit('layout:toggleMenuItem', 'users', 'panels'),
            selected: state.layout.panels.users,
            info: Object.keys(state.multiPeer.peers).length + 1
            // classes: state.layout.panels.chat ? "bg-mid-gray": ""
          })}
          <br>
          ${!state.layout.collapsed ? menuItem({
            icon:  'fa-chevron-down',
            title: "Collapse menu",
            onclick: () => emit('layout:collapseMenu', 0)
          }) :  menuItem({
            // icon:  'fa-angle-double-up',
            icon: 'fa-chevron-up',
            title: "Expand menu",
            onclick: () => emit('layout:collapseMenu', 2)
          })}
        </div>
    </div>
    `
  }
}
//
//
// ${menuItem({
//   icon: state.layout.settings.stretchToFit? 'fa-compress-alt': 'fa-expand-alt',
//   title: state.layout.settings.stretchToFit? 'Fit to bounding box':"Stretch videos to fit screen",
//   onclick: () => emit('layout:toggleMenuItem', 'stretchToFit', 'settings')
// })}
