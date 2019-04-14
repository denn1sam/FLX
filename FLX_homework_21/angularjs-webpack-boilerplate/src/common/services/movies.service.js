export class MoviesService {
  constructor($http) {
    this.$http = $http;
    this.limit = null;
    this.total = null;
  }

  findMovieById(id) {
    return Promise.resolve(this.$http.get(`https://reactjs-cdp.herokuapp.com/movies/${id}`)
      .then(result => result.data));
  }

  async getAllMovies(limit, offset) {
    const result = await Promise.resolve(this.$http.get(`https://reactjs-cdp.herokuapp.com/movies?limit=${limit}&offset=${offset}`));
    return result.data.data;
  }
}

MoviesService.serviceName = 'moviesService';
MoviesService.$inject = ['$http'];
