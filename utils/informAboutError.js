

export const informAboutError = (error, status, message, res) =>
{
    console.log(error);
    res.status(status).json({
        message,
    })
}