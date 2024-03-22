namespace halchemy;

public class Api(string baseUrl)
{
    private readonly string _baseUrl = baseUrl;

    public override string ToString()
    {
        return _baseUrl;
    }
}
