/**
 * Dependence
*/
const
	Sequelize = require('sequelize');


module.exports = (app) => {

	/**
	 * Init
	*/
	const sequelize = new Sequelize(
		process.env.DB_DATABASE,
		process.env.DB_USERNAME,
		process.env.DB_PASSWORD,
		{
			host: process.env.DB_HOST,
			port: process.env.PORT,
			dialect: process.env.DB_CLIENT
		}
    );
    
    
    /**
     * Connection
     */
    this.connection = sequelize;


    /**
     * Models
     */
    this.models = sequelize.models;


    /**
     * Test Connection
     */
    this.authenticate = () => {
        return sequelize.authenticate()
            .then(() => {
                console.log('[SEQUELIZE] Success authenticate!');
            })
            .catch((error) => {
                console.error('[SEQUELIZE] Error authenticate:', error);
            });
    }


    /**
     * Close Connection
     */
    this.close = () => {
        return sequelize.close();
    }


    /**
     * Sync
     */
    this.sync = (option = {}) => {
        return sequelize.sync(option);
    }


	/**
	 * Return
	*/
	return this;
}