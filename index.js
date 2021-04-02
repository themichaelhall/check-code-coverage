const core = require('@actions/core');
const application = require('./src/application');

try {
    const result = new application.Application().run(
        core.getInput('coverage-report', {required: true}),
        core.getInput('required-coverage-percentage', {required: true}),
    );

    result.isSuccess ?
        core.info(result.message) :
        core.setFailed(result.message);

} catch (error) {
    core.setFailed(error.message);
}
