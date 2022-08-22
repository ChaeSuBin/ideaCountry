import { TeamPlayers, Players 
} from '../models.js';

export const getOwner = (_teamId) => {
    return new Promise(resolve => {
        TeamPlayers.findOne({
            where: { teamId: _teamId }
            }).then(teamPlayer => {
            Players.findOne({
                where: { id: teamPlayer.playerId }
            }).then(owner => {
                resolve(owner.sub);
            })
        })
    });
}
export const getOwnerReturnId = (_teamId) => {
    return new Promise(resolve => {
        TeamPlayers.findOne({
            where: { teamId: _teamId }
            }).then(teamPlayer => {
            resolve(teamPlayer.playerId);
        })
    });
}