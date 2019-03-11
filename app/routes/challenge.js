import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
    //return this.store.findRecord('challenge', params.challenge_id);
    return RSVP.hash({
      challenge: this.store.findRecord('challenge', params.challenge_id),
      candidates: this.store.findAll('candidate')
    });
  }
});
