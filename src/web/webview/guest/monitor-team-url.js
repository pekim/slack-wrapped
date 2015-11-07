import ipc from 'ipc';

export default function monitorTeamUrl() {
  let teamUrl;

  setInterval(() => {
    const TS = window.TS;

    if (TS && TS.boot_data && TS.boot_data.team_url) {
      if (TS.boot_data.team_url !== teamUrl) {
        ipc.sendToHost('teamUrl', TS.boot_data.team_url);
        teamUrl = TS.boot_data.team_url;
      }
    }
  }, 2000);
}
